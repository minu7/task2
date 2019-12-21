module.exports = (crypto, io, id, price) => {
  io.to(crypto).emit('data', {
    crypto,
    key: 'price',
    value: price,
    id
  });
};
