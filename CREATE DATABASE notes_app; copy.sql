CREATE DATABASE barangayDB;
USE barangayDB;

CREATE TABLE entries (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nameLast TEXT NOT NULL,
    nameFirst TEXT NOT NULL,
    nameMiddle TEXT NOT NULL,
    nameSuffix TEXT,
    nameNick TEXT,
    image TEXT NOT NULL,
    birthdate TIMESTAMP NOT NULL,
    sex TEXT NOT NULL,
    legalGuardianLast TEXT NOT NULL,
    legalGuardianFirst TEXT NOT NULL,
    legalGuardianMiddle TEXT NOT NULL,
    legalGuardianSuffix TEXT ,
    legalGuardianNick TEXT ,
    legalGuardianContact TEXT NOT NULL,
    addressUnit TEXT  ,
    addressLot TEXT  ,
    addressStreet TEXT NOT NULL,
    addressRemarks TEXT  ,
    academicLastSchool TEXT NOT NULL,
    academicLastSchoolAttendance INTEGER NOT NULL,
    academicLastLevel INTEGER NOT NULL
);

INSERT INTO entries (nameLast, nameFirst, nameMiddle, nameSuffix, nameNick, image, birthdate, sex, legalGuardianLast, legalGuardianFirst, legalGuardianMiddle, legalGuardianSuffix, legalGuardianNick, legalGuardianContact, addressUnit, addressLot, addressStreet, addressRemarks, academicLastSchool, academicLastSchoolAttendance, academicLastLevel )
VALUES ('Cinco', 'Theolo', 'Perfecto', '', '', 'https://4.bp.blogspot.com/-f--CFpMCnCk/Uk0ZMy-W6EI/AAAAAAAA-Y0 i_EDQ-u9vLc', '2003-01-13 00:00:00', 'male', 'Cinco', 'Tristan', 'Perfecto', '', 'Kuya', '09776997477', 'Unit 1', 'Lot 2', 'Kalye Street', 'Tabi ng poste', 'La Salle Elementary School', '2013', '4' )