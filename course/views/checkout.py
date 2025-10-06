from django.shortcuts import render , redirect
from course.models import Course , Video , Payment , UserCourse
from django.shortcuts import HttpResponse
# Create your views here.
from django.template.loader import render_to_string
from django.conf import settings    
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from flexible.settings import *
from time import time

import razorpay
client = razorpay.Client(auth=(KEY_ID, KEY_SECRET))


@login_required(login_url='/login')
def checkout(request , slug):
    course = Course.objects.get(slug  = slug)
    user = request.user
    action = request.GET.get('action')
    order = None
    payment = None
    error = None
    try:
        user_course = UserCourse.objects.get(user = user  , course = course)
        error = "You are Already Enrolled in this Course"
        return redirect('my-courses')
    except UserCourse.DoesNotExist:
        pass

    amount=None
    if error is None : 
        amount =  int((course.price - ( course.price * course.discount * 0.01 )) * 100)
   # if ammount is zero dont create paymenty , only save emrollment obbect 
    
    if amount==0:
        userCourse = UserCourse(user = user , course = course)
        userCourse.save()
        return redirect('my-courses')   
                # enroll direct
    if action == 'create_payment':

            currency = "INR"
            notes = {
                "email" : user.email, 
                "name" : f'{user.first_name} {user.last_name}'
            }
            reciept = f"sudhirkumar-{int(time())}"
            order = client.order.create(
                {'receipt' :reciept , 
                'notes' : notes , 
                'amount' : amount ,
                'currency' : currency
                }
            )
            print(order)

            payment = Payment()
            payment.user  = user
            payment.course = course
            payment.order_id = order.get('id')
            payment.save()


    
    context = {
        "course" : course , 
        "order" : order, 
        "payment" : payment, 
        "user" : user , 
        "error" : error
    }
    return  render(request , template_name="courses/check_out.html" , context=context )    

# @login_required(login_url='/core/login')
# @csrf_exempt
# def verifyPayment(request):
#     if request.method == "POST":
#         data = request.POST
#         context = {}
#         print(data)
#         try: 
#             client.utility.verify_payment_signature(data)
#             razorpay_order_id = data['razorpay_order_id']
#             razorpay_payment_id = data['razorpay_payment_id']

#             payment = Payment.objects.get(order_id = razorpay_order_id)
#             payment.payment_id  = razorpay_payment_id
#             payment.status =  True
            
#             try:
#                 user_course = UserCourse(user=payment.user, course=payment.course)
#             except UserCourse.DoesNotExist:
#                 user_course = UserCourse(user=payment.user, course=payment.course)
#                 user_course.save()
#             print(user_course)
#             payment.user_course = user_course
#             payment.save()

#             return redirect('my-courses')   
  
#         except:
#             return HttpResponse("Invalid Payment Details")        
@csrf_exempt
def verifyPayment(request):
    if request.method == "POST":
        data = request.POST
        print(data)
        try:
            params_dict = {
                'razorpay_order_id': data.get('razorpay_order_id'),
                'razorpay_payment_id': data.get('razorpay_payment_id'),
                'razorpay_signature': data.get('razorpay_signature')
            }

            client.utility.verify_payment_signature(params_dict)

            razorpay_order_id = params_dict['razorpay_order_id']
            razorpay_payment_id = params_dict['razorpay_payment_id']

            payment = Payment.objects.get(order_id=razorpay_order_id)
            payment.payment_id = razorpay_payment_id
            payment.status = True

            user_course, created = UserCourse.objects.get_or_create(
                user=payment.user, course=payment.course
            )
            print(user_course)
            payment.user_course = user_course
            payment.save()
            
            subject = "Payment Successful - Course Enrollment Confirmed"
            message = render_to_string("emails/payment_success.html", {
                'user': payment.user,
                'course': payment.course,
                'payment': payment,
            })
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [payment.user.email],
                fail_silently=False,
            )

            return redirect('payment-confirmation')

        except Exception as e:
            print("Payment verification error:", e)
            return HttpResponse("Invalid Payment Details")
    else:
        return HttpResponse("Only POST method is allowed")
    
 
@login_required(login_url='core/login')
def payment_confirmation(request):
    return render(request, "courses/payment_confirmation.html")
