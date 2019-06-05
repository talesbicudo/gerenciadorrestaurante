export default {
    filters: {
       formatPrice: function(price) {
           return price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
       }
    }
}