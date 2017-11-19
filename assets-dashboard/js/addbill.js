

var arr = [];
var friendslist=[];
var json ;
var arr1= []; 
var map = new Object();	


 function addFriends(group_name)
 {

	 $.ajax({
                    url : "../AddBillController",
                    type : "GET",
					autoFocus: true,
                    data : {
                           'addGroupFriends' : group_name
                    },
                    dataType : "json",
                    success : function(data) {
							if(jQuery.isEmptyObject(data))
							{
								if(!friendslist.includes(group_name))
								{
									friendslist.push(group_name);
									add_payees_in_amount_modal(friendslist);
									add_payees_in_amount_exact_modal(friendslist);
									bill_amount_on_blur();
								}					
							}
							else{
								$.each(data, function(index, element) {
								   	if(!friendslist.includes(element))
									{	
										friendslist.push(element);
										add_payees_in_amount_modal(friendslist);
										add_payees_in_amount_exact_modal(friendslist);
										bill_amount_on_blur();										
									}
							   });	
							}
							return 0;
         
                    }
					
             });
			
			 
 }
 
$(document).on('click','.token-input-delete-token-mac',function(){
    // code here
	 //alert($(this).attr("data-id"));
	 var dataid = $(this).attr("data-id");
	 if(dataid.charAt(0) == "G")
	 {
		 var group_id=dataid.substring(1,(dataid.length+1));
		$.ajax({
                    url : "../AddBillController",
                    type : "GET",
					async:false,
					autoFocus: true,
                    data : {
                           'removeGroupFriends' : group_id
                    },
                    dataType : "json",
                    success : function(data) {
						$.each(data, function(index, element) {
								//alert(element);
								remove(friendslist,element);
								//add_payers_in_select_payer();
								add_payees_in_amount_modal(friendslist);
								add_payees_in_amount_exact_modal(friendslist);
								bill_amount_on_blur();
								
						});	
						
						$.ajax({
							url : "../AddBillController",
							type : "GET",
							async:false,
							autoFocus: true,
							data : {
								   'removeGroupName' : group_id
							},
							dataType : "json",
							success : function(data1) {
								
										remove(arr,data1);
										$.each(arr, function(index, element) {
											addFriends(element);
										});
								}
					
						});
						
                    }
					
             }); 
			 
			 $('li[data-id='+dataid+']').remove();
			 
	 }
	 else
	 {
		 var group_id=dataid.substring(1,(dataid.length+1));
		remove(friendslist,group_id);
		remove(arr,group_id);
		//alert(dataid);
		$('li[data-id="'+dataid+'"]').remove();
		
	 }
	

	 	
});

$(document).on('click','li.main_payer',function(){
		
		  $( "li.main_payer" ).removeClass( "selected" );
		  $(this).addClass("selected" );
		  $("#payer").val($(this).attr("data-id"));
		  $('#payer_span_id').text($(this).attr("data-id"));
		
});

	
	
	
$("#token-input-add_bill_with").autocomplete({     
             source : function(request, response) {
               $.ajax({
                    url : "../AddBillController",
                    type : "GET",
					autoFocus: true,
                    data : {
                           'search_keyword' : request.term
                    },
                    dataType : "json",
                    success : function(data) {
						json = data;
						for(var i=0;i<data.length;i++){
							var currentObj = data[i];
							//alert(currentObj["name"]);
							arr1[i]=currentObj["name"];
          
						}
						response(arr1);
                    }
             });
          },
		  
		 select: function( event, ui ) {
			for(var i=0;i<json.length;i++)
			{
				var currentObj = json[i];
				if(currentObj["name"] == ui.item.value)
				{
					if(currentObj["id"] != "user")
					{
						if(!arr.includes(ui.item.value))
						{	
							$("#with_person_list").prepend('<li class="token-input-token-mac" data-id=G'+currentObj["id"]+'><p><img src="https://dx0qysuen8cbs.cloudfront.net/assets/fat_rabbit/avatars/50-31b0bb2f5aec77f11d60a1dc3fa14c23a958fed79261b32e94a73e9c27473ebb.png">'+ui.item.value+'</p><span class="token-input-delete-token-mac" data-id=G'+currentObj["id"]+' >x</span></li>'); 
							
							
								
							arr.push(ui.item.value);
											
							var i=addFriends(ui.item.value);
							
						}
						else{
							alert("Already Added!");
						}
					}
					else{
						if(!arr.includes(ui.item.value))
						{	
							$("#with_person_list").prepend('<li class="token-input-token-mac" data-id=F'+currentObj["name"]+'><p><img src="https://dx0qysuen8cbs.cloudfront.net/assets/fat_rabbit/avatars/50-31b0bb2f5aec77f11d60a1dc3fa14c23a958fed79261b32e94a73e9c27473ebb.png">'+ui.item.value+'</p><span class="token-input-delete-token-mac" data-id=F'+currentObj["name"]+'>x</span></li>'); 
								
							arr.push(ui.item.value);
											
							var i=addFriends(ui.item.value);
							
						}
						else{
							alert("Already Added!");
						}
					}
				}
			}	
		
			
			$("#token-input-add_bill_with").val("");
			 return false;
      },	  
 });

 
 