import faker from 'faker';
import _ from 'lodash';
import fp from 'lodash/fp'

faker.locale = "pt_BR";
faker.seed(3);
const ITEM_QUANTITY = 20;
const ORDERS_QUANTITY = 30;

const OPEN_DATE = new Date();
OPEN_DATE.setHours(OPEN_DATE.getHours() - 1);
const CLOSE_DATE = new Date();

const table = (number) => ({
    id: faker.random.uuid(),
    number
})

const day = (date, orders) => ({
    date: date.toString(),
    id: faker.random.uuid(),
    orders
})

const payment = (value, createdAt) => ({
    provider: faker.name.firstName(),
    value,
    createdAt: faker.date.between(createdAt, CLOSE_DATE),
    id: faker.random.uuid()
})

const item = (limit) => ({
    name: faker.lorem.word(),
    value: +faker.commerce.price(1, limit),
    id: faker.random.uuid()
})

let items = [...Array(ITEM_QUANTITY)].map(() => item(100));

const consumedItem = (createdAt) => ({
    id: faker.random.uuid(),
    itemType: items[faker.random.number(ITEM_QUANTITY - 1)],
    quantity: faker.random.number({ min: 1, max: 3 }),
    createdAt: faker.date.between(createdAt, CLOSE_DATE)
})
const createOrder = (numberTable) => {
    const createdAt = faker.date.between(OPEN_DATE, CLOSE_DATE);
    const itemQ = faker.random.number({ min: 1, max: 3 });
    const items = [...Array(itemQ)].map(() => consumedItem(createdAt))
    const totalItemPrice = items.length ?
        items.reduce(
            (val, { itemType, quantity }) => val + itemType.value * quantity, 0) :
        0;
    const totalItems = _.sumBy(items, 'quantity');
    const lastItemDate = items.length ? _.maxBy(items, 'createdAt').createdAt : createdAt;
    let payments = items.length ?
        [...Array(faker.random.number(itemQ))].map(() =>
            payment(+faker.commerce.price(1, totalItemPrice / totalItems), lastItemDate)) :
        [];
    const open = faker.random.boolean();
    if (!open) {
        const valueToPay = totalItemPrice - _.sumBy(payments, 'value');
        payments.push(payment(valueToPay, lastItemDate));
    }
    const lastPaymentDate = payments.length ? _.maxBy(payments, 'createdAt').createdAt : lastItemDate;
    return {
        consumedItems: items,
        payments,
        open,
        table: table(numberTable),
        createdAt,
        closedAt: !open ? faker.date.between(lastPaymentDate, CLOSE_DATE) : null,
        id: faker.random.uuid()
    }
}

const findOrder = id => orders.find(order => order.id === id);
const findItemType = id => items.find(item => item.id === id);

let orders = [...Array(ORDERS_QUANTITY).keys()].map(i => createOrder(++i));
orders = _.sortBy(orders, 'createdAt').map((order, i) => ({ ...order, number: i }));
let days = ([day(OPEN_DATE, orders)]);

export default {
    ID: (root) => {
        return root.id;
    },
    Order: () => ({
        payments: [],
        consumedItems: []
    }),
    DateTime: (obj, args, context, field) => {
        if (obj[field.fieldName]) return obj[field.fieldName];
        return new Date();
    },

    Query: () => ({
        dayOrders: () => {
            const groupedData = Object.values(_.groupBy(_.last(days).orders, "table.number"));
            const data = groupedData.map(fp.maxBy("createdAt"));
            return data;
        }

        ,
        itemTypes: () => items,
    }),
    Mutation: () => ({
        closeOrder: (root, { id }) => {
            const order = findOrder(id);
            order.open = false;
            order.closedAt = new Date();
            return order;
        },
        newOrder: (root, { tableNumber }) => {
            const newOrder = {
                consumedItems: [],
                payments: [],
                open: true,
                table: orders.find(order => order.table.number === tableNumber).table,
                createdAt: new Date(),
                closedAt: null,
                id: faker.random.uuid(),
                number: orders.length + 1,
            }
            orders.push(newOrder);
            return newOrder;
        },
        addPayment: (root, args) => {
            const { id, value } = args;
            const order = findOrder(id);
            const newPayment = {
                id: faker.random.uuid(),
                provider: args.provider || "",
                createdAt: new Date(),
                value
            }
            order.payments.push(newPayment)

            return newPayment;
        },
        addItem(root, { orderId, quantity, itemId }) {
            const order = findOrder(orderId);
            const consumedItem = {
                id: faker.random.uuid(),
                createdAt: new Date(),
                itemType: findItemType(itemId),
                quantity
            }
            order.consumedItems.push(consumedItem);
            return consumedItem;
        },
        removeItem(root, { orderId, itemId }) {
            const order = findOrder(orderId);
            const toRemove = _.find(order.consumedItems, item => item.id === itemId);
            _.remove(order.consumedItems, item => item.id === itemId);
            return toRemove;
        },
        removePayment(root, { orderId, paymentId }) {
            const order = findOrder(orderId);
            const toRemove = _.find(order.payments, item => item.id === paymentId);
            _.remove(order.consumedItems, item => item.id === paymentId);
            return toRemove;
        }
    }),
}
