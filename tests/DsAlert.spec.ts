import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DsAlert from '@/design-system/components/DsAlert.vue'

describe('DsAlert', () => {
    it('renderiza mensagem', () => {
        const wrapper = mount(DsAlert, {
            props: {
                message: 'Este é um alerta'
            }
        })
        expect(wrapper.text()).toContain('Este é um alerta')
    })

    it('renderiza título quando fornecido', () => {
        const wrapper = mount(DsAlert, {
            props: {
                title: 'Título do Alerta',
                message: 'Mensagem do alerta'
            }
        })
        expect(wrapper.find('.ds-alert-title').text()).toBe('Título do Alerta')
    })

    it('aplica classe de variante', () => {
        const wrapper = mount(DsAlert, {
            props: {
                variant: 'error',
                message: 'Mensagem de erro'
            }
        })
        expect(wrapper.find('.ds-alert--error').exists()).toBe(true)
    })

    it('mostra botão de fechar quando dismissible', () => {
        const wrapper = mount(DsAlert, {
            props: {
                message: 'Alerta dispensável',
                dismissible: true
            }
        })
        expect(wrapper.find('.ds-alert-close').exists()).toBe(true)
    })

    it('emite evento dismiss quando botão fechar é clicado', async () => {
        const wrapper = mount(DsAlert, {
            props: {
                message: 'Alerta',
                dismissible: true
            }
        })
        await wrapper.find('.ds-alert-close').trigger('click')
        expect(wrapper.emitted('dismiss')).toBeTruthy()
    })

    it('atualiza modelValue quando fechado', async () => {
        const wrapper = mount(DsAlert, {
            props: {
                modelValue: true,
                message: 'Alerta',
                dismissible: true
            }
        })
        await wrapper.find('.ds-alert-close').trigger('click')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    })

    it('renderiza conteúdo do slot', () => {
        const wrapper = mount(DsAlert, {
            slots: {
                default: '<strong>Conteúdo personalizado</strong>'
            }
        })
        expect(wrapper.html()).toContain('Conteúdo personalizado')
    })

    it('exibe por padrão quando modelValue é true', () => {
        const wrapper = mount(DsAlert, {
            props: {
                modelValue: true,
                message: 'Alerta visível'
            }
        })
        expect(wrapper.find('.ds-alert').exists()).toBe(true)
    })
})
