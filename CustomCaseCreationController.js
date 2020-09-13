({
    
    keychange : function(component, event, helper) {
        var subjectField = component.find("subject");
        var subject =  subjectField.get("v.value");  
        var evtknowledge = $A.get("e.domain21:knowledgeWidgetEvent");
        evtknowledge.setParams({
            "Subjectevt" : subject });
        evtknowledge.fire();    
    }
    
    
})
