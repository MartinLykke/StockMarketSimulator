public class BuyStockInputType : InputObjectType<BuyStockInput>
{
    protected override void Configure(IInputObjectTypeDescriptor<BuyStockInput> descriptor)
    {
        descriptor.Field(t => t.UserID).Type<NonNullType<IntType>>();
        descriptor.Field(t => t.StockID).Type<NonNullType<IntType>>();
    }
}
