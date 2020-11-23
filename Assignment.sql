PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE agent (
    agentid  NUMBER(7) PRIMARY KEY,
    aname    VARCHAR2(25) NOT NULL,
    aemail   VARCHAR2(25) NOT NULL,
    aphone   VARCHAR2(15)
);
CREATE TABLE client (
    clientid  NUMBER(7) PRIMARY KEY,
    cname     VARCHAR2(20) NOT NULL,
    caddr     VARCHAR2(60) NOT NULL,
    cphone    VARCHAR2(13),
    cemail    VARCHAR2(30)
);
CREATE TABLE procat (
    catid    NUMBER(7) PRIMARY KEY,
    catname  VARCHAR2(20) NOT NULL
);
CREATE TABLE protype (
    ptypeid    NUMBER(7) PRIMARY KEY,
    ptypename  VARCHAR2(20) NOT NULL,
    catid      NUMBER(7) NOT NULL,
    FOREIGN KEY ( catid )REFERENCES procat ( catid )
);
CREATE TABLE property (
    propertyid     NUMBER(7) PRIMARY KEY,
    paddr          VARCHAR2(80) NOT NULL,
    regdate        DATE NOT NULL,
    noofrooms      NUMBER(2),
    noofbathrooms  NUMBER(2),
    askprice       NUMBER(7, 2),
    ptypeid        NUMBER(7) NOT NULL,
    agentid        NUMBER(7) NOT NULL,
    FOREIGN KEY ( ptypeid )REFERENCES protype ( ptypeid ),
    FOREIGN KEY ( agentid )REFERENCES agent ( agentid )
);
CREATE TABLE forsale (
    forsaleid   NUMBER(7) PRIMARY KEY,
    salestatus  VARCHAR2(15) NOT NULL,
    propertyid  NUMBER(7) NOT NULL,
    sellerid    NUMBER(7) NOT NULL,
    buyerid     NUMBER(7),
    FOREIGN KEY ( propertyid )REFERENCES property ( propertyid ),
    FOREIGN KEY ( buyerid )REFERENCES client ( clientid ),
    FOREIGN KEY ( sellerid )REFERENCES client ( clientid )
);
COMMIT;