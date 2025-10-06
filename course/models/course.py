from django.db import models

class Course(models.Model):
    name = models.CharField(max_length = 50 , null = False)
    slug = models.CharField(max_length = 50 , null = False , unique = True)
    description = models.CharField(max_length = 200 , null = True)
    course_type = models.CharField(max_length = 200 , null = True)
    
    price = models.IntegerField(null=False)
    discount = models.IntegerField(null=False , default = 0) 
    active = models.BooleanField(default = False)
    thumbnail = models.ImageField(upload_to = "files/thumbnail") 
    date = models.DateTimeField(auto_now_add= True) 
    resource = models.FileField(upload_to = "files/resource")
    length = models.IntegerField(null=False)
    
    level = models.CharField(
        max_length=50,  
        choices=[
            ('GCSE', 'GCSE'),
            ('A-Level', 'A-Level'),
            ('O-Level', 'O-Level'),
            ('AS-Level', 'AS-Level'),
            ('AQA', 'AQA'),           
            ('BSc', 'BSc'),
            ('MSc', 'MSc'),
            ('PhD', 'PhD'),
        ],
        default='GCSE',
    )
    mode = models.CharField(
        max_length=50,
        choices=[
            ('Online', 'Online'),
            ('Face-to-Face', 'Face-to-Face'),
        ],
        default='Online',
    )
    psw_eligible = models.CharField(
        max_length=10,
        choices=[
            ('Yes', 'Yes'),
            ('No', 'No'),
        ],
        default='No',
    )


    def __str__(self):
        return self.name


class CourseProperty(models.Model):
    description  = models.CharField(max_length = 100 , null = False)
    course = models.ForeignKey(Course , null = False , on_delete=models.CASCADE)

    class Meta : 
        abstract = True


class Tag(CourseProperty):
    pass
    
class Prerequisite(CourseProperty):
    pass

class Learning(CourseProperty):
    pass
