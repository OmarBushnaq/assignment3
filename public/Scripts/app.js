/* SPA --> single page app */
(function(){
    function Start()
    {
        console.log("App Started")
        let deleteButtons = document.querySelectorAll('.btn-danger');
    for(button of deleteButtons)
    {
        button.addEventListener('click',(event)=>{
            if(!confirm("Are you sure want to delete this assignment?"))
            {
                event.preventDefault();
                window.location.assign('/assignments');
            }
        });
    }
    }
    window.addEventListener("load", Start);
})();