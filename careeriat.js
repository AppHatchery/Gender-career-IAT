define(['pipAPI','https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat8.js'], function(APIConstructor, iatExtension){
	var API = new APIConstructor();

    return iatExtension({
      attribute1 : {
			name : 'Male', //Will appear in the data.
			title : {
				media : {word : 'Male Names'}, //Name of the category presented in the task.
				css : {color:'#0000FF','font-size':'1.8em'}, //Style of the category title.
				height : 4 //Used to position the "Or" in the combined block.
			}, 
			stimulusMedia : [ //Stimuli content as PIP's media objects
				{word: 'Ben'},
				{word: 'Paul'},
				{word: 'Daniel'},
				{word: 'John'},
				{word: 'Jeffrey'}
			], 
			//Stimulus css (style)
			stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},	
		attribute2 :	{
			name : 'Female', //Will appear in the data.
			title : {
				media : {word : 'Female Names'}, //Name of the category presented in the task.
				css : {color:'#0000FF','font-size':'1.8em'}, //Style of the category title.
				height : 4 //Used to position the "Or" in the combined block.
			}, 
			stimulusMedia : [ //Stimuli content as PIP's media objects
				{word: 'Rebecca'},
				{word: 'Michelle'},
				{word: 'Emily'},
				{word: 'Julia'},
				{word: 'Anna'}
			], 
			//Stimulus css
			stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},
		category1 : 
		{
			name : 'Career', 
			title : {
				media : {word : 'Career'}, 
				css : {color:'#31940F','font-size':'1.8em'}, 
				height : 4 //Used to position the "Or" in the combined block.
			}, 
			stimulusMedia : [ //Stimuli content as PIP's media objects
				{word: 'Career'},
				{word: 'Corporation'},
				{word: 'Salary'},
				{word: 'Office'},
				{word: 'Professional'},
				{word: 'Management'},
				{word: 'Business'}
			], 
			//Stimulus css
			stimulusCss : {color:'#31940F','font-size':'2.3em'} 
		},
		category2 : 
		{
			name : 'Family', 
			title : {
				media : {word : 'Family'}, 
				css : {color:'#31940F','font-size':'1.8em'}, 
				height : 4 //Used to position the "Or" in the combined block.
			}, 
			stimulusMedia : [ //Stimuli content as PIP's media objects
				{word: 'Wedding'},
				{word: 'Marriage'},
				{word: 'Parents'},
				{word: 'Relatives'},
				{word: 'Family'},
				{word: 'Home'}, 
				{word: 'Children'}
			], 
			//Stimulus css
			stimulusCss : {color:'#31940F','font-size':'2.3em'}
		},
		isTouch : API.getGlobal().isTouch,
		
		//The default feedback messages for each cutoff -
		//attribute1, and attribute2 will be replaced with the name of attribute1 and attribute2.
		//categoryA is the name of the category that is found to be associated with attribute1,
		//and categoryB is the name of the category that is found to be associated with attribute2.
		fb_strong_Att1WithCatA_Att2WithCatB : 'Your responses suggested a strong automatic association for attribute1 with categoryA and attribute2 with categoryB.',
		fb_moderate_Att1WithCatA_Att2WithCatB : 'Your responses suggested a moderate automatic association for attribute1 with categoryA and attribute2 with categoryB.',
		fb_slight_Att1WithCatA_Att2WithCatB : 'Your responses suggested a slight automatic association for attribute1 with categoryA and attribute2 with categoryB.',
		fb_equal_CatAvsCatB : 'Your responses suggested little or no automatic association between attribute2 and attribute1 with categoryA and categoryB.',

		// Add this to the bottom of the iatExtension configuration
		// Add a global end function to ensure it runs at the end of the task
        trials: [
            {
                inherit: 'sort',
                data: {
                    block: 'B1', // Replace 'B1' with appropriate block name
                },
                // Add raw data collection
                onEnd: function(trialData) {
                    // Store trial data into global rawData
                    API.addGlobal({ rawData: API.getGlobal().rawData.concat(trialData) });
                    console.log('Trial data stored:', trialData);
                }
            }
        ]
    });
});