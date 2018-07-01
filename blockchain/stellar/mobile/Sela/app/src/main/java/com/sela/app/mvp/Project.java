package com.sela.app.mvp;

import java.util.Date;

public class Project {
    protected static class Status {
        protected static final String DORMANT = "DORMANT";
        protected static final String ACCEPTED = "ACCEPTED";
        protected static final String STARTED = "STARTED";
        protected static final String TERMINATED = "TERMINATED";
        protected static final String COMPLETED = "COMPLETED";
    }
//    protected String projectId;
//    protected String ownerId;
    protected String projectName;
    protected String projectDesc;
//    protected List<String> servAgents;
//    protected List<String> evalAgents;
    protected double capital;
    protected double quote;
    protected Date start;
    protected Date end;
    protected String status;
//    protected Map<Boolean, String> reports;
//    protected Map<String, Double> rewards;

    Project(/*String projectId, String ownerId, */String projectName, String projectDesc, double cap, double quote, Date start, Date end) {
//        this.projectId = projectId;
//        this.ownerId = ownerId;
        this.projectName = projectName;
        this.projectDesc = projectDesc;
        this.capital = cap;
        this.quote = quote;
        this.start = start;
        this.end = end;
//        this.servAgents = new ArrayList<String>();
//        this.evalAgents = new ArrayList<String>();
        this.status = Project.Status.DORMANT;
//        this.reports = new HashMap<Boolean, String>();
//        this.rewards = new HashMap<String, Double>();
    }
}
