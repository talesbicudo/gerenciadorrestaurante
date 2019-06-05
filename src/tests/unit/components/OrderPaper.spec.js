import { shallowMount } from '@vue/test-utils';
import OrderPaper from '@/components/OrderPaper';

describe("Order Paper component", () => {
    it("Renders", () => {
        const wrapper = shallowMount(OrderPaper);
        expect(wrapper.exists()).toBe(true);
    })
    it("Has correct classes modifiers on header", () => {
        const wrapper = shallowMount(OrderPaper);
        const { baseClass } = wrapper.vm;
        expect(wrapper.find(`.${baseClass}__header--inactive`).is('div')).toBe(true);
        wrapper.setProps({ active: true });
        expect(wrapper.find(`.${baseClass}__header--active`).is('div')).toBe(true);
    })
    it("Has correct number prop", () => {
        const wrapper = shallowMount(OrderPaper);
        const { baseClass } = wrapper.vm;
        expect(wrapper.find(`.${baseClass}__number`).text()).toBe('0');
        wrapper.setProps({number: 23});
        expect(wrapper.find(`.${baseClass}__number`).text()).toBe('23');
    })
})