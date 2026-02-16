import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DsInput from '@/design-system/components/DsInput.vue'

describe('DsInput', () => {
    it('renderiza com label', () => {
        const wrapper = mount(DsInput, {
            props: {
                label: 'Name',
                modelValue: ''
            }
        })
        expect(wrapper.find('label').text()).toContain('Name')
    })

    it('exibe mensagem de erro', () => {
        const wrapper = mount(DsInput, {
            props: {
                modelValue: '',
                error: 'Este campo é obrigatório'
            }
        })
        expect(wrapper.find('.ds-input-error').text()).toBe('Este campo é obrigatório')
    })

    it('exibe mensagem de dica quando não há erro', () => {
        const wrapper = mount(DsInput, {
            props: {
                modelValue: '',
                hint: 'Digite seu nome'
            }
        })
        expect(wrapper.find('.ds-input-hint').text()).toBe('Digite seu nome')
    })

    it('emite update:modelValue ao digitar', async () => {
        const wrapper = mount(DsInput, {
            props: {
                modelValue: ''
            }
        })
        const input = wrapper.find('input')
        await input.setValue('valor de teste')
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['valor de teste'])
    })

    it('mostra asterisco de obrigatório quando required', () => {
        const wrapper = mount(DsInput, {
            props: {
                label: 'Email',
                modelValue: '',
                required: true
            }
        })
        expect(wrapper.find('.ds-input-required').exists()).toBe(true)
    })

    it('aplica classe de erro quando há erro', () => {
        const wrapper = mount(DsInput, {
            props: {
                modelValue: '',
                error: 'Erro'
            }
        })
        expect(wrapper.find('.ds-input--error').exists()).toBe(true)
    })

    it('lida com tipo number', async () => {
        const wrapper = mount(DsInput, {
            props: {
                type: 'number',
                modelValue: 0
            }
        })
        const input = wrapper.find('input')
        await input.setValue('123')
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([123])
    })
})
