# The script of the game goes in this file.

# Declare characters used by this game. The color argument colorizes the
# name of the character.

style say_dialogue:
    kerning 4.0

init python:
    style.kerned_name = Style(style.say_label)
    style.kerned_name.kerning = 8  # Adjust this number as needed

define e = Character("Protagonist")
define m = Character("Mila", color ="#ffffff", who_outlines=[(6, "#0a0706", absolute(0), absolute(0))], who_style="kerned_name")



# The game starts here.

label start:

    # Show a background. This uses a placeholder by default, but you can
    # add a file (named either "bg room.png" or "bg room.jpg") to the
    # images directory to show it.

    scene bg kitchen

    "Knock. Knock. Knock."

    show protagonist cautious at left

    e "Who's knocking this late at night..."

    show protagonist determined at left

    e "I swear, if this is another prank from Kuya..."


    # This shows a character sprite. A placeholder is used, but you can
    # replace it by adding a file named "eileen happy.png" to the images
    # directory.

    scene bg kitchen
    show protagonist confused at left

    "Beat. Another knock. Wind howls softly outside."

    show protagonist cautious at left

    e "Tita always reminds me to keep a spoon around in case of midnight guest..."
    e "I didnt think Id expect someone especially when Im home alone..."

    show protagonist cautious at left

    "Answer the door?"

    label opendoor:
        menu:

            "Open the door.":
                jump opendoor_yes

            "Ask who it is":
                jump opendoor_question

            "Peek through window":
                jump opendoor_peek

    label opendoor_yes:

        $ menu_flag = True

        scene bg kitchen

        "*approaches to the door*"

        scene bg door

        show protagonist cautious at left

        e "Eek..."

        show protagonist cautious at left

        e "This is scary..."

        jump door1_done

    label opendoor_question:

        $ menu_flag = False

        scene bg door
        show protagonist confused at left

        e "Who is it?"

        "..."

        show protagonist cautious at left 

        "Eek..."

        jump door1_done

    label opendoor_peek:

        $ menu_flag = False

        scene bg kitchen
        show protagonist confused at left

        e "*Peeks through the window*"

        scene bg peek

        e "...!"
        e "She's so scary..."

        jump door1_done

    label door1_done:

        scene bg convo
        show protagonist neutral at left
        show mila neutral o at right

        m "Hi. I know its late. Can I come in for some water?"

        e "Uh... right. Water. Just... hold on... Do I know you?"

        show mila smile at right

        m "Oh sorry, how rude of me! Im Mila, Tita told me to come here if I needed anything."

        show protagonist cautious at left

        e "*Water during midnight...? Who is this woman, she looks like she crawled right out of a horror film!*"

        "What should I do?"

        label folklore:
            menu:

                "Bring up folklore subtly":
                    jump folklore_subtly

                "Accuse her directly":
                    jump folklore_accuse

                "Invite her in":
                    jump folklore_invite
        
        label folklore_subtly:

        $ menu_flag = True

        scene bg subtly

        e "Hey... Actually Tita never really said anything about you, she did bring up something about a spoon test. Have you ever heard about it?"

        scene bg convo
        show mila smile at right
        show protagonist cautious at left

        m "..."

        e "When it comes to midnight guests, you shouldn't invite them inside"
        e "especially without checking their reflection on a spoon. If you show upside down I'll let you in."

        scene bg subtly

        jump folklore_done

                
        label folklore_accuse:

        $ menu_flag = False

        scene bg convo

        show mila neutral at right
        show protagonist cautious at left

        e "When it comes to midnight guests, you shouldn't invite them inside."
        e "You must be an aswang, but if your reflection on the spoon shows upside down I could let you in..."

        show mila sus at right

        m "..."

        scene bg door
        show mila sus at right

        jump folklore_done


        label folklore_invite:

        $ menu_flag = False

        scene bg convo

        show mila neutral at right
        show protagonist cautious at left

        e "Come in, Tita didn't mention any guests. Hold on let me just clean the place up a bit."

        scene bg kitchen
        show mila smile at right

        m "..."

        show mila sus at right

        jump folklore_done
        

    label folklore_done:

        scene bg kitchen
        show mila distorted at center
 
        m "you got me..."
    


    # These display lines of dialogue.
    # This ends the game.

    return
