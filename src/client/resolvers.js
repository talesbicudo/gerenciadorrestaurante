import faker from 'faker';

faker.locale = "pt_BR";
faker.seed(3);
const ITEM_QUANTITY = 20;
const ORDERS_QUANTITY = 30;

const OPEN_DATE = new Date();
const CLOSE_DATE = new Date(OPEN_DATE.getTime());
CLOSE_DATE.setHours(OPEN_DATE.getHours() + 1);

const table = (number) => ({
    id: faker.random.uuid(),
    number
})

const day = (date, orders) => ({
    date,
    id: faker.random.uuid(),
    orders
})

const payment = (limit, createdAt) => ({
    provider: faker.name.firstName(),
    value: +faker.commerce.price(0, limit, 2),
    createdAt: faker.date.between(createdAt, CLOSE_DATE),
    id: faker.random.uuid()
})

const item = (limit) => ({
    name: faker.lorem.word(),
    value: +faker.commerce.price(0, limit, 2),
    id: faker.random.uuid()
})

let items = [...Array(ITEM_QUANTITY)].map(() => item(100));

const consumedItem = (createdAt) => ({
    itemType: items[faker.random.number(ITEM_QUANTITY - 1)],
    quantity: faker.random.number({ min: 1, max: 3 }),
    createdAt: faker.date.between(createdAt, CLOSE_DATE),
    id: faker.random.uuid()
})

const createOrder = (numberTable) => {
    const createdAt = faker.date.between(OPEN_DATE, CLOSE_DATE);
    const itemQ = faker.random.number(3);
    const items = [...Array(itemQ)].map(() => consumedItem(createdAt))
    const totalItemPrice = items.length ?
        items.reduce(
            (val, { itemType, quantity }) => val + itemType.value * quantity, 0) :
        0;
    const open = faker.random.boolean();
    return {
        consumedItems: items,
        payments: items.length ?
            [...Array(faker.random.number(itemQ))].map(() => payment(totalItemPrice / itemQ + 1, createdAt)) :
            [],
        open,
        table: table(numberTable),
        createdAt,
        closedAt: !open ? faker.date.between(createdAt, CLOSE_DATE) : null,
        id: faker.random.uuid()
    }
}

const findOrder = id => orders.find(order => order.id === id);


let orders = [...Array(ORDERS_QUANTITY).keys()].map(i => createOrder(i));
let days = ([day(OPEN_DATE, orders)]);

export default {
    ID: (root) => {
        return root.id;
    },
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
                value
            })
            return order;
        }
    })
}
