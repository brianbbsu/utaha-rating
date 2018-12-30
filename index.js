var app = new Vue({
    el: '#app',
    data: {
        accounts: ["_Utaha_","UtahaSenpai","iloveUtaha","UtahaS3npai","Utahaaaa","6thUtaha"],
        ratings: [],
        CurrentSortingField: "",
        SortingDir: ""
    },
    created: function(){
        $.get({
            url: "https://codeforces.com/api/user.info",
            data: {
                handles: this.accounts.join(";")
            }
        }).done(data => {
            this.ratings = data.result;
            console.log(data);
        });
    },
    methods: {
        SortField: function(field) {
            if(field === this.CurrentSortingField)this.SortingDir = (this.SortingDir === "asc"?"desc":"asc");
            else{
                this.CurrentSortingField = field;
                this.SortingDir = "desc";
            }
            this.ratings.sort((a,b) => (a[field] > b[field]) ? 1 : (a[field] < b[field]) ? -1 : 0);
            if(this.SortingDir === "desc")this.ratings = this.ratings.reverse();
        },
        GetColor: function(rank) {
            if(rank === "grandmaster" || rank === "international grandmaster" )return "red";
            else if(rank === "master" || rank === "international master")return "#FF8C00";
            else if(rank === "candidate master")return "#a0a";
            else if(rank === "expert")return "blue";
            else if(rank === "specialist")return "#03A89E";
            else if(rank === "pupil")return "green";
            else if(rank === "newbie")return "gray";
        }
    }
});
