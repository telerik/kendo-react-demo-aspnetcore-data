namespace reactSpa.Models
{
    public class Product
    {
        public Product(int productId, string productName, short unitsInStock)
        {
            this.ProductId = productId;
            this.ProductName = productName;
            this.UnitsInStock = unitsInStock;
        }

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public short? UnitsInStock { get; set; }
    }
}
