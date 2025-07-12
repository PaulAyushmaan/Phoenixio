from pytz import timezone
from datetime import datetime, timedelta

from dependencies.configuration import AppConfiguration

# Define IST timezone
IST = timezone('Asia/Kolkata')


def get_expiry_timestamp():
    return int((datetime.now(IST) + timedelta(minutes=30)).timestamp())


# # Razorpay payment link payload
# RAZORPAY_PAYMENT_LINK_PAYLOAD = {
#     "currency": "INR",
#     "accept_partial": False,
#     "description": "",
#     "customer": {
#         "name": "",
#         "email": "",
#         "contact": ""
#     },
#     "notify": {
#         "sms": True,
#         "email": True
#     },
#     "reminder_enable": True,
#     "notes": {
#         "user_id": "",
#         "credits_purchased": ""
#     },
#     "callback_url": f"{AppConfiguration.BACKEND_BASE_URL}/dashboard/api/v1/payments/verify",
#     "callback_method": "get",
#     "expire_by": get_expiry_timestamp()
# }
