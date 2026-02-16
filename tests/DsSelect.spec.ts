import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DsSelect from '@/design-system/components/DsSelect.vue'

describe('DsSelect', () => {
    const options = [
        { value: '1', label: 'Opção 1' },
        { value: '2', label: 'Opção 2' },
        { value: '3', label: 'Opção 3' }
    ]

    it('renderiza todas as opções', () => {
        const wrapper = mount(DsSelect, {
            props: {
                options,
                modelValue: ''
            }
        })
        const selectOptions = wrapper.findAll('option')
        expect(selectOptions.length).toBe(3)
    })

    it('renderiza label quando fornecido', () => {
        const wrapper = mount(DsSelect, {
            props: {
                options,
                modelValue: '',
                label: 'Selecione uma opção'
            }
        })
        expect(wrapper.find('label').text()).toContain('Selecione uma opção')
    })

    it('renderiza opção de placeholder', () => {
        const wrapper = mount(DsSelect, {
            props: {
                options,
                modelValue: '',
                placeholder: 'Escolha uma'
            }
        })
        expect(wrapper.html()).toContain('Escolha uma')
    })

    it('emite update:modelValue ao mudar', async () => {
        const wrapper = mount(DsSelect, {
            props: {
                options,
                modelValue: ''
            }
        })
        const select = wrapper.find('select')
        await select.setValue('2')
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2'])
    })

    it('exibe mensagem de erro', () => {
        const wrapper = mount(DsSelect, {
            props: {
                options,
                modelValue: '',
                error: 'Por favor selecione uma opção'
            }
        })
        expect(wrapper.find('.ds-select-error').text()).toBe('Por favor selecione uma opção')
    })

    it('mostra asterisco de obrigatório', () => {
        const wrapper = mount(DsSelect, {
            props: {
                options,
                modelValue: '',
                label: 'Campo Obrigatório',
                required: true
            }
        })
        expect(wrapper.find('.ds-select-required').exists()).toBe(true)
    })
})
