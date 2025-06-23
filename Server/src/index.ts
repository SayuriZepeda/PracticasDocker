const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
