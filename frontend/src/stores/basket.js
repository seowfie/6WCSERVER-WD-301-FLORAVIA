// src/stores/basket.js
import { defineStore } from 'pinia'

const STORAGE_KEY = 'basket_items_v1'

export const useBasketStore = defineStore('basket', {
  state: () => ({
    items: [], // [{ bouquet_name, price, image, quantity, stock }]
    _loaded: false,
  }),

  getters: {
    totalItems: (state) => state.items.reduce((s, i) => s + i.quantity, 0),
    totalPrice: (state) => state.items.reduce((s, i) => s + i.price * i.quantity, 0),
  },

  actions: {
    /* =====================================================
       🧺 Load from localStorage
    ====================================================== */
    _loadFromStorage() {
      if (this._loaded) return
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) this.items = JSON.parse(raw)
      } catch (e) {
        console.warn('⚠️ Failed to load basket from storage', e)
      }
      this._loaded = true
    },

    /* =====================================================
       💾 Save to localStorage
    ====================================================== */
    _saveToStorage() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
      } catch (e) {
        console.warn('⚠️ Failed to save basket to storage', e)
      }
    },

    /* =====================================================
       🌸 Add item to basket
       Uses bouquet_name for MongoDB consistency
    ====================================================== */
    addToCart(payload) {
      this._loadFromStorage()

      const {
        _id,
        bouquet_name,
        name,
        price,
        image,
        quantity = 1,
        stock,
      } = payload

      // ✅ Always prefer bouquet_name
      const finalName = bouquet_name || name
      if (!finalName) return

      // Find existing product by bouquet_name
      const idx = this.items.findIndex(
        (i) => i.bouquet_name === finalName
      )

      if (idx >= 0) {
        // Update existing item
        const current = this.items[idx]
        const maxQty =
          typeof (current.stock ?? stock) === 'number'
            ? current.stock ?? stock
            : Infinity
        const nextQty = Math.min(current.quantity + quantity, maxQty)

        this.items[idx] = {
          ...current,
          quantity: nextQty,
          price,
          image,
          stock: current.stock ?? stock,
        }
      } else {
        // Add new item
        this.items.push({
          _id: _id || null,
          bouquet_name: finalName,
          name: finalName,
          price,
          image,
          quantity,
          stock,
        })
      }

      this._saveToStorage()
    },

    /* =====================================================
       🌿 Update quantity
    ====================================================== */
    updateQuantity(name, quantity, stock) {
      this._loadFromStorage()
      const idx = this.items.findIndex(
        (i) => i.bouquet_name === name || i.name === name
      )
      if (idx === -1) return

      const maxQty =
        typeof (this.items[idx].stock ?? stock) === 'number'
          ? this.items[idx].stock ?? stock
          : Infinity
      const q = Math.max(1, Math.min(quantity, maxQty))
      this.items[idx].quantity = q
      if (typeof stock === 'number') this.items[idx].stock = stock
      this._saveToStorage()
    },

    /* =====================================================
       💐 Remove item
    ====================================================== */
    removeFromCart(name) {
      this._loadFromStorage()
      this.items = this.items.filter(
        (i) => i.bouquet_name !== name && i.name !== name
      )
      this._saveToStorage()
    },

    /* =====================================================
       🧼 Clear basket
    ====================================================== */
    clearBasket() {
      this._loadFromStorage()
      this.items = []
      this._saveToStorage()
    },
  },
})
