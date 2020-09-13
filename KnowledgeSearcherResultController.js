({
    doInit: function(cmp, helper) {
        cmp.set("v.activeSections",["A","B","C"]);
    },
    navigate: function(cmp, event, helper) {
        var evt = $A.get("e.force:navigateToSObject");
        evt.setParams({
            "recordId": cmp.get('v.article').KnowledgeArticleId
        });
        evt.fire();
    },
    handleMouseOver : function(component,event,helper){
        alert(event.currentTarget.dataset.value);
        component.set('v.KnowledgeId',event.currentTarget.dataset.value);
        component.set('v.articleDetails',true);
    },
    CloseDetails : function(component,event,helper){
        component.set('v.articleDetails',false);
    }
})
