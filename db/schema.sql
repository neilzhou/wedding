create database if not exists `wedding` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER 'wedding'@'localhost' IDENTIFIED BY 'Wedding@#$'; 
GRANT ALL ON wedding.* TO 'wedding'@'localhost';

use `wedding`;
create table if not exists `wedding_participants`(    
    id int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    join_status SMALLINT(2) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1: comming, 2: pending, 3: busy',
    count SMALLINT(2) UNSIGNED NOT NULL DEFAULT 1,
    created_at DATETIME NULL,
    modified_at DATETIME NULL,
    PRIMARY KEY(id),
    KEY `participants_name`(name)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

create table if not exists `bless`(    
    id int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    participant_id int(11) UNSIGNED NOT NULL DEFAULT 0,
    name varchar(50) NOT NULL,
    message varchar(255) NULL,
    created_at DATETIME NULL,
    modified_at DATETIME NULL,
    PRIMARY KEY(id),
    KEY `bless_name`(name),
    KEY `bless_participant_id`(participant_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
