package com.github.melandr.testproject.server.db.init;

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
        template.execute("CREATE TABLE IF NOT EXISTS CATEGORIES(ID INT PRIMARY KEY, NAME VARCHAR(255) NOT NULL, STATE CHAR(1) NOT NULL)");
    }

    private void initUsersTable() {
        template.execute("CREATE TABLE IF NOT EXISTS USERS("
                + " ID INT PRIMARY KEY,"
                + " LOGIN VARCHAR(255) NOT NULL,"
                + " PASSWORD VARCHAR(255) DEFAULT '12345' NOT NULL,"
                + " FIRST_NAME VARCHAR(255) NOT NULL,"
                + " LAST_NAME VARCHAR(255) NOT NULL,"
                + " MIDDLE_NAME VARCHAR(255) NOT NULL,"
                + " PHONE VARCHAR(13),"
                + " EMAIL VARCHAR(50),"
                + " PHOTO BLOB(10K)"
                + ");");
    }

    private void initUserToCategoryTable() {
        template.execute("CREATE TABLE IF NOT EXISTS USER_TO_CATEGORY("
                + " ID INT PRIMARY KEY,"
                + " USER_ID INT NOT NULL,"
                + " CATEGORY_ID INT NOT NULL,"
                + " FOREIGN KEY (USER_ID) REFERENCES USERS(ID),"
                + " FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORIES(ID)"
                + ");");
    }
}
