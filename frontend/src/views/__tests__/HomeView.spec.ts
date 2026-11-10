import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../HomeView.vue'

describe('HomeView', () => {
  it('muestra el título de la aplicación', () => {
    // mount() renderiza el componente en un DOM simulado (jsdom)
    const wrapper = mount(HomeView)
    expect(wrapper.find('h1').text()).toBe('Backlog to Play')
  })
})
