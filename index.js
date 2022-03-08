const { ApolloServer, gql } = require('apollo-server')

const usuarios = [{
    id: 1,
    nome: 'Caio Ferreira',
    email: 'caaio.ferreira@gmail.com',
    idade: 27
}, {
    id: 2,
    nome: 'Fernando Gramado',
    email: 'fernando.gramado@gmail.com',
    idade: 22
}, {
    id: 3,
    nome: 'Fernanda Souza',
    email: 'fernandasouza@hotmail.com',
    idade: 34
}]

const typeDefs = gql`
scalar Date
scalar usuarios

type Usuario{
id: ID
nome:String!
email: String!
idade: Int
salario: Float
vip: Boolean
}

type Produto{
nome: String!
preco: Float!
desconto: Float
precoComDesconto: Float
}

type Query {
    ola: String!
    hora: Date!
    usuarioLogado: Usuario
    produtoEmDestaque: Produto
    numerosMegaSena: [Int!]!
    usuarios: [Usuario]
}`



const resolvers = {
    Produto: {
        precoComDesconto(parent) {
            if (parent.desconto) {
                return parent.preco * (1 - parent.desconto)
            } else {
                return parent.preco
            }
        }
    },
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        }
    },
    Query: {
        ola() {
            return 'Boa noite'
        },

        hora() {
            return `${new Date}`
        },
        usuarioLogado() {
            return {
                id: 1,
                nome: 'Caio Ferreira',
                email: 'caaio.ferreira@gmail.com',
                idade: 27,
                salario_real: 2499.99,
                vip: true

            }
        },
        produtoEmDestaque() {
            return {
                nome: 'Macbook Pro',
                preco: 11990.90,
                desconto: 0.15
            }
        },

        numerosMegaSena() {
            const crescente = (a, b) => a - b

            return Array(6).fill(0).map(e => parseInt(Math.random() * 60 + 1)).sort(crescente)
        }

    },
    usuarios() {
        return usuarios
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(url)
})