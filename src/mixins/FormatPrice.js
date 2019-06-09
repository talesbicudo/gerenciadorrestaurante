export default {
    filters: {
       formatPrice: function(price, pass=true) {
           if (!pass) return price;
           return price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
       }
    }
}