
drop table if exists states;
create table states(
    stateId bigint identity(1, 1) not null,
    nameState nvarchar(100) not null,
    primary key(stateId)
)

drop table if exists auth;
create table auth(
    authId bigint identity(1, 1) not null,
    nick nvarchar(255) not null,
    pass nvarchar(255) not null,
    primary key(authId)
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

drop table if exists users;
create table users(
    userId bigint identity(1, 1) not null,
    authId bigint,
    name nvarchar(255),
    lastName nvarchar (255),
    email nvarchar(255),
    phone nvarchar(255),
    addressUser nvarchar(500),
    primary key(userId),
    foreign key (authId) references auth(authId)
)

drop table if exists cases;
create table cases(
    caseId bigint identity(1, 1) not null,
    nameEnterprise nvarchar(255) not null,
    amountLost nvarchar(255) not null,
    stateId bigint not null,
    userId bigint not null,
    primary key(caseId),
    foreign key(stateId) references states(stateId),
    foreign key(userId) references users(userId)
)

create table roles(
    roleId bigint identity(1,1),
    name nvarchar(20) not null,
    primary key(roleId)
)
