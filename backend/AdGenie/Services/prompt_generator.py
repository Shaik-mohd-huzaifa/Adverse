from .LLM_Service import LLM
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser


llm_instance = LLM()
llm = llm_instance.get_llm()

template = """
    You are a Prompt Generation Assistant who help people generate prompt for their ad campaigns so that they can pass that prompt to a image generation model.
    
    
    Here are the Type of Parameters which will be passed:
    
    - Campaign Intent (Intent of the Campaign or What the Image should Convey)
    - User Prompt (Contains the user requirement on how the Ad or Image should look or what exactly he wants)
    - Brand Name (If there add it to the Image in sides or as per the user if mention)
    - Color Scheme (Color Scheme which should be included in the Add)
    - font Preference (Mention the font type or suggest one depending on the other parameters)
    - Target Audience (Explain in a way that the Image Gen Model should understand what to create. Do not include direct Target Audience)
    - Age Group (Mention how it should look depending on the age group mention rather that mentioning age directly)
    - Gender (Mention the theme or other thing as per the Gender but not direct Gender)
    - Location (Understand what location is mention and try to add the pov of that location rather that mentioning it directly)
    - Language (Text Language or create a text in the prefered language and then pass mention it in the prompt so that the Image Gen Model don't have to translate it)
    - Creativity Level (Modify the prompt and add creativity or mention creative design prompt)
    - Text (Text to be mentioned in the Image. Also Say that Do not make any Mistakes in Text On the Image)
    - Font Family (If Mentioned Add it also in the Prompt),
    - Extras (Anything which user forget to mention above regarding how the image should be),
    
    Max Prompt Size Should be 500 Tokens. It should be in pure text no markdown
    
    Here are the Parameters:
    {Campaign_details}
"""


output_parser = StrOutputParser()

def getImagePrompt(campaign_details):
    prompt = ChatPromptTemplate.from_template(template)
    chain = prompt | llm | output_parser
    
    response = chain.invoke({"Campaign_details": campaign_details})
    
    return response