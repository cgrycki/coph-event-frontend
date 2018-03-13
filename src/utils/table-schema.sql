CREATE TABLE IF NOT EXISTS `Events` (
	`EventID` int(10) NOT NULL auto_increment,
	`UserEmail` varchar(255),
	`EventName` varchar(255),
	`EventDate` date,
	`EventTime` time,
	`EventComments` text,
	`NumPeople` numeric(9,2),
	`NumChairsPerTable` numeric(9,2),
	`NumRoundTables` numeric(9,2),
	`NumRectTables` numeric(9,2),
	`NumPosterBoards` numeric(9,2),
	`NumTrashCans` numeric(9,2),
	`LayoutPNG` varchar(255),
	PRIMARY KEY( `EventID` )
);

CREATE TABLE `Events` (
	`EventID` bigint NOT NULL AUTO_INCREMENT,
	`UserEmail` varchar(255) NOT NULL,
	`UserName` varchar(255) NOT NULL,
	`EventName` varchar(255) NOT NULL,
	`EventDate` DATE NOT NULL,
	`EventTime` TIME NOT NULL,
	`EventComments` TEXT,
	`NumPeople` int NOT NULL DEFAULT '0',
	`NumChairsPerTable` int NOT NULL DEFAULT '6',
	`NumRoundTables` int NOT NULL DEFAULT '0',
	`NumRectTables` int NOT NULL DEFAULT '0',
	`NumPosterBoards` int NOT NULL DEFAULT '0',
	`NumTrashCans` int NOT NULL DEFAULT '0',
	`LayountPNG` tinyblob NOT NULL DEFAULT '0',
	PRIMARY KEY (`EventID`)
);
