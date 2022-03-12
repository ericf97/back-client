Server=localhost\SQLEXPRESS;Database=master;Trusted_Connection=True;

create table users(
    idUser bigint identity(1, 1) not null,
    name nvarchar(255),
    lastName nvarchar (255),
    email nvarchar(255),
    phone nvarchar(255)
)
