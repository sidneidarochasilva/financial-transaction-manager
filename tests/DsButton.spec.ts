import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DsButton from '@/design-system/components/DsButton.vue'

describe('DsButton', () => {
    it('renderiza o conteúdo do slot', () => {
        const wrapper = mount(DsButton, {
            slots: {
                default: 'Click me'
            }
        })
        expect(wrapper.text()).toContain('Click me')
    })

    it('aplica a classe da variante primary por padrão', () => {
        const wrapper = mount(DsButton)
        expect(wrapper.find('.ds-button--primary').exists()).toBe(true)
    })

    it('aplica a classe da variante correta', () => {
        const wrapper = mount(DsButton, {
            props: {
                variant: 'success'
            }
        })
        expect(wrapper.find('.ds-button--success').exists()).toBe(true)
    })

    it('emite evento de click quando clicado', async () => {
        const wrapper = mount(DsButton)
        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('não emite click quando desabilitado', async () => {
        const wrapper = mount(DsButton, {
            props: {
                disabled: true
            }
        })
        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('mostra o loader quando está carregando', () => {
        const wrapper = mount(DsButton, {
            props: {
                loading: true
            }
        })
        expect(wrapper.find('.ds-button__loader').exists()).toBe(true)
    })
})
