import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DsBadge from '@/design-system/components/DsBadge.vue'

describe('DsBadge', () => {
    it('renderiza o conteúdo do slot', () => {
        const wrapper = mount(DsBadge, {
            slots: {
                default: 'Texto do Badge'
            }
        })
        expect(wrapper.text()).toBe('Texto do Badge')
    })

    it('aplica classe de variante', () => {
        const wrapper = mount(DsBadge, {
            props: {
                variant: 'success'
            }
        })
        expect(wrapper.find('.ds-badge--success').exists()).toBe(true)
    })

    it('aplica classe de tamanho', () => {
        const wrapper = mount(DsBadge, {
            props: {
                size: 'lg'
            }
        })
        expect(wrapper.find('.ds-badge--lg').exists()).toBe(true)
    })

    it('aplica classe outlined', () => {
        const wrapper = mount(DsBadge, {
            props: {
                outlined: true
            }
        })
        expect(wrapper.find('.ds-badge--outlined').exists()).toBe(true)
    })

    it('aplica variante neutral por padrão', () => {
        const wrapper = mount(DsBadge)
        expect(wrapper.find('.ds-badge--neutral').exists()).toBe(true)
    })

    it('aplica tamanho md por padrão', () => {
        const wrapper = mount(DsBadge)
        expect(wrapper.find('.ds-badge--md').exists()).toBe(true)
    })
})
