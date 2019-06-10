import faker from 'faker';
import _ from 'lodash';

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
    date,
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
    const itemQ = faker.random.number({min: 1, max: 3});
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


let orders = [...Array(ORDERS_QUANTITY).keys()].map(i => createOrder(++i));
orders = _.sortBy(orders, 'createdAt').map((order, i) => ({...order, number: i}));
let days = ([day(OPEN_DATE, orders)]);
export default {
    ID: (root) => {
        return root.id;
    },
    Order: () => ({
        payments: [],
        consumedItems: []
    }),
    Query: () => ({
        dayOrders: (root, { dayDate }) =>
            days.find(findingDay => {
                return findingDay.date.toDateString() === dayDate.toDateString()
            }).orders
        ,
        itemTypes: () => items,
    }),
    Mutation: () => ({
        closeOrder: (root, { orderId }) => {
            const order = findOrder(orderId);
            order.open = false;
            return order;
        },
        addPayment: (root, args) => {
            const { orderId, value } = args;
            const order = findOrder(orderId);
            order.payments.push({
                id: faker.random.uuid(),
                provider: args.provider || "",
                createdAt: new Date(),
                value
            })
            return order;
        }
    }),
}
