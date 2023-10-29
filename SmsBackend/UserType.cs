using HotChocolate.Types;
using StockMarketBackend.Models;

namespace StockMarketBackend.GraphQL.Types
{
    public class UserType : ObjectType<User>
    {
        protected override void Configure(IObjectTypeDescriptor<User> descriptor)
        {
            
            descriptor.Field(u => u.UserID)
                .Type<NonNullType<IdType>>();
            descriptor.Field(u => u.Username)
                .Type<NonNullType<StringType>>();
            // Add other user fields here
        }
    }
}
