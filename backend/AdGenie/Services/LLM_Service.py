from langchain_aws import ChatBedrock
from dotenv import load_dotenv
import os

load_dotenv()

AWS_DEFAULT_REGION = os.getenv("AWS_DEFAULT_REGION")

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
# AWS_SESSION_TOKEN=os.getenv("AWS_SESSION_TOKEN")

print(os.getenv("AWS_SECRET_ACCESS_KEY_PERSONAL"))


class LLM:

    def get_llm(self):
        return ChatBedrock(
            model_id="anthropic.claude-3-5-sonnet-20240620-v1:0",
            model_kwargs=dict(temperature=0),
            region_name="us-west-2",
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            # aws_session_token=AWS_SESSION_TOKEN,
        )


llm = LLM()

llm = llm.get_llm()

messages = [
    (
        "system",
        "Who is the father of AI",
    ),
    ("human", "I love programming."),
]
# ai_msg = llm.invoke(messages)
# print(ai_msg)
