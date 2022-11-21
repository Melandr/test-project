package com.github.melandr.testproject.server.integration.db.init;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DBInitiator implements InitializingBean {

    @Autowired
    private JdbcTemplate template;

    @Override
    public void afterPropertiesSet() throws Exception {
        initCategoryTable();
        initUsersTable();
        initUserToCategoryTable();
    }

    private void initCategoryTable() {
        template.execute(
                "create table if not exists ROLES(ID int auto_increment primary key, NAME varchar(255) not null unique)");
    }

    private void initUsersTable() {
        template.execute("create table if not exists USERS("
                + " ID int auto_increment primary key,"
                + " LOGIN varchar(255) not null unique,"
                + " PASSWORD varchar(255) default '12345' not null,"
                + " FIRST_NAME varchar(255) not null,"
                + " LAST_NAME varchar(255) not null,"
                + " MIDDLE_NAME varchar(255) not null,"
                + " PHONE varchar(13),"
                + " EMAIL varchar(50),"
                + " PHOTO blob(10K)"
                + ")");
    }

    private void initUserToCategoryTable() {
        template.execute("create table if not exists USER_TO_ROLE("
                + " ID int auto_increment primary key,"
                + " USER_ID int not null,"
                + " ROLE_ID int not null,"
                + " foreign key (USER_ID) references USERS(ID),"
                + " foreign key (ROLE_ID) references ROLES(ID)"
                + ")");
    }
}
