import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DsCard from '@/design-system/components/DsCard.vue'

describe('DsCard', () => {
    it('renderiza o conteúdo do slot', () => {
        const wrapper = mount(DsCard, {
            slots: {
                default: '<p>Conteúdo do card</p>'
            }
        })
        expect(wrapper.html()).toContain('Conteúdo do card')
    })

    it('renderiza título quando fornecido', () => {
        const wrapper = mount(DsCard, {
            props: {
                title: 'Título do Card'
            }
        })
        expect(wrapper.find('.ds-card-title').text()).toBe('Título do Card')
    })

    it('renderiza slot de cabeçalho', () => {
        const wrapper = mount(DsCard, {
            slots: {
                header: '<h2>Cabeçalho Personalizado</h2>'
            }
        })
        expect(wrapper.html()).toContain('Cabeçalho Personalizado')
    })

    it('renderiza slot de rodapé', () => {
        const wrapper = mount(DsCard, {
            slots: {
                footer: '<div>Conteúdo do rodapé</div>'
            }
        })
        expect(wrapper.html()).toContain('Conteúdo do rodapé')
    })

    it('aplica classe de variante', () => {
        const wrapper = mount(DsCard, {
            props: {
                variant: 'bordered'
            }
        })
        expect(wrapper.find('.ds-card--bordered').exists()).toBe(true)
    })

    it('aplica classe hoverable', () => {
        const wrapper = mount(DsCard, {
            props: {
                hoverable: true
            }
        })
        expect(wrapper.find('.ds-card--hoverable').exists()).toBe(true)
    })

    it('aplica classe de padding', () => {
        const wrapper = mount(DsCard, {
            props: {
                padding: 'lg'
            }
        })
        expect(wrapper.find('.ds-card--padding-lg').exists()).toBe(true)
    })
})
