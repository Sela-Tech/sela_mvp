package com.sela.app.mvp;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ProjectUtil {
//    public static final com.sela.app.selapilot.Project SampleProject1 = new com.sela.app.selapilot.Project("NDDC 1", "NDDC com.sela.app.selapilot.Project 1", 10000.0, 100.0, new Date(), new Date());
//    public static final com.sela.app.selapilot.Project SampleProject2 =  new com.sela.app.selapilot.Project("SHELL 7", "SHELL com.sela.app.selapilot.Project 7", 70000.0, 700.0, new Date(), new Date());
//    public static final com.sela.app.selapilot.Project SampleProject3 = new com.sela.app.selapilot.Project("SI 4", "SI com.sela.app.selapilot.Project 4", 40000.0, 400.0, new Date(), new Date());

    public static final ProjectItem SampleProjectItem1 = new ProjectItem("NDDC com.sela.app.selapilot.Project 1");
    public static final ProjectItem SampleProjectItem2 = new ProjectItem("SHELL com.sela.app.selapilot.Project 7");
    public static final ProjectItem SampleProjectItem3 = new ProjectItem("SI com.sela.app.selapilot.Project 4");

    public static final List<ProjectItem> SampleProjectItems = new ArrayList<ProjectItem>(Arrays.asList(SampleProjectItem1, SampleProjectItem2, SampleProjectItem3));
}
