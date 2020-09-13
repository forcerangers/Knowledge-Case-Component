({
    
    handleApplicationEvent : function(cmp,event,helper){
        var SubVal = event.getParam("Subjectevt")
        cmp.set("v.Subject",SubVal);
        var action = cmp.get('c.search');
        var args = {
            'SubjectValue': cmp.get("v.Subject"),
        }
        action.setParams(args);        
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS") {
                cmp.set("v.article", true);
                cmp.set('v.articles', response.getReturnValue());
               
            }
            else if (state === "ERROR") {
                cmp.set("v.article", false);
                cmp.set('v.articles',null);
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        if(SubVal.length >1){
            $A.enqueueAction(action);
        }
        
    },
    SearchKnowledge : function(component, event, helper) {
        
        var currentText = event.getSource().get("v.value");
        var resultBox = component.find('resultBox');
        if(currentText.length > 0) {
            $A.util.addClass(resultBox, 'slds-is-open');
        }
        else {
            $A.util.removeClass(resultBox, 'slds-is-open');
        }
        var action = component.get("c.getKnowledgeResults");
        action.setParams({
            "SearchText" : currentText
        });
        
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.searchRecords", response.getReturnValue());
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    navigate: function(cmp, event, helper) {
        
        var evt = $A.get("e.force:navigateToSObject");
        evt.setParams({
            "recordId": event.currentTarget.dataset.value
        });
        evt.fire();
    },
})
