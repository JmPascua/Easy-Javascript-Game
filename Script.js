var character = document.getElementById("character");
var block = document.getElementById("block");
var counter=0;

function jump()
{
    if(character.classList == "animate"){return}
    character.classList.add("animate");
    setTimeout(function()
    {
        character.classList.remove("animate");
    },300);
}

//The eventlistener command adds the action
document.addEventListener('keydown',function (e)
{
    //this line prevents pressing and holding to spam jump
    if (e.repeat) return;

    //if you're typing else where it will not trigger the jump for the game
    const t = e.target;
    const typing = 
        t.tagName === 'INPUT' ||
        t.tagName === 'TEXTAREA' ||
        t.isContentEditable === true;
    
    if (typing) return;

    //this chunk of code will detect whether space is being used across other pages or browsers
    const isSpace = 
        e.code === 'Space' ||
        e.key === ' ' ||
        e.keyCode === 32;

    //if statement prevents the page from scrolling when space is used outside of a typing field
    if (isSpace)
    {
        e.preventDefault();
        jump();
    }
});

var checkDead = setInterval(function() 
{
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    if(blockLeft<20 && blockLeft>-20 && characterTop>=130)
    {
        block.style.animation = "none";
        alert("Game Over. score: "+Math.floor(counter/100));
        counter=0;
        block.style.animation = "block 1s infinite linear";
    }
    else
    {
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }

}, 10);
