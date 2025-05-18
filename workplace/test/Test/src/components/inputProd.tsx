import { type FormEvent, useState } from 'react'
import type { Category, Product } from '../components/product'

type Props = {
  onCreateProduct: (product: Omit<Product, 'id'>) => void
  onError: (error: Error) => void
}

const ProductInput = ({ onCreateProduct, onError }: Props) => {
  const [name, setName] = useState('')
  const [info, setInfo] = useState('')
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState<Category>('Computers')
  const [imageUrl, setImageUrl] = useState('')
  const [tags, setTags] = useState('')

  function submitProduct(event: FormEvent) {
    event.preventDefault()

    if (!name || !imageUrl || price < 0 || !category) {
      onError(new Error('All required fields must be filled correctly.'))
      return
    }

    const product: Omit<Product, 'id'> = {
      name,
      info,
      price,
      category,
      imageUrl,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean)
    }

    onCreateProduct(product)
    resetForm()
  }

  function resetForm() {
    setName('')
    setInfo('')
    setPrice(0)
    setCategory('Computers')
    setImageUrl('')
    setTags('')
  }

  return (
    <form onSubmit={submitProduct} onReset={resetForm}>
      <input
        placeholder="Product Name"
        value={name}
        maxLength={80}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        placeholder="Info"
        value={info}
        maxLength={256}
        onChange={e => setInfo(e.target.value)}
      />
      <input
        placeholder="Price"
        type="number"
        value={price}
        min={0}
        onChange={e => setPrice(parseFloat(e.target.value))}
        required
      />
      <select value={category} onChange={e => setCategory(e.target.value as Category)} required>
        <option value="Computers">Computers</option>
        <option value="Phones">Phones</option>
        <option value="Accessories">Accessories</option>
        <option value="Software">Software</option>
      </select>
      <input
        placeholder="Image URL"
        type="url"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
        required
      />
      <input
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
      />

      <div className="buttons">
        <button type="submit">Add Product</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  )
}

export default ProductInput
