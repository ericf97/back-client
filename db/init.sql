Server=localhost\SQLEXPRESS;Database=master;Trusted_Connection=True;

create table users(
    idUser bigint identity(1, 1) not null,
    name nvarchar(255),
    lastName nvarchar (255),
    email nvarchar(255),
    phone nvarchar(255)
)

drop table if exists cases
create table cases(
    caseId bigint identity(1, 1) not null,
    nameEnterprise nvarchar(255) not null,
    amountLost nvarchar(255) not null,
    primary key(caseId)
)

drop table if exists deposit;
create table deposit(
    depositId bigint identity(1, 1) not null,
    amount decimal(10, 2) not null,
    moneyType nvarchar(55) not null,
    methodType nvarchar(55),
    dateDeposit datetime,
    caseId bigint not null,
    foreign key(caseId) references cases(caseId)
)

drop table if exists auth;
create table auth(
    authId bigint identity(1, 1) not null,
    nick nvarchar(255) not null,
    pass nvarchar(255) not null,
    primary key(authId)
)
