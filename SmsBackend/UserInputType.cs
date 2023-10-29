using HotChocolate.Types;

public class UserInputType : InputObjectType<UserInput>
{
    protected override void Configure(IInputObjectTypeDescriptor<UserInput> descriptor)
    {
        descriptor.Name("UserInput");
        descriptor.Field(x => x.Username).Type<StringType>().Name("username");
    }
}

public class UserInput
{
    public string Username { get; set; }
}
