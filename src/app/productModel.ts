export interface ProductResault {
    value: Product[]
}

export interface Product {
    _id: string
    featured: boolean
    category: string
    amount: number
    manufacture: string
    image: string
    name: string
    tag: string
    description: string
    shortDescrotion: string
}