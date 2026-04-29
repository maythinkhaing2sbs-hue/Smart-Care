import { Injectable, signal } from '@angular/core';
import { Hospital, Booking, ConsultationSession, TripPlan, MedicalDocument, Review } from '../models/hospital.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  readonly hospitals = signal<Hospital[]>([
    {
      id: 'h1',
      name: 'Memorial Sloan Kettering',
      location: 'New York, USA',
      country: 'USA',
      city: 'New York',
      image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviewsCount: 1240,
      specialty: 'Oncology',
      specialties: ['Oncology', 'Cancer Care', 'Surgery', 'Radiation Therapy'],
      description: 'World-renowned cancer treatment and research center.',
      facilities: ['24/7 Care', 'ICU', 'Pharmacy', 'Lab', 'Wifi', 'Parking'],
      doctors: [
        { id: 'd1', name: 'Dr. John Smith', specialty: 'Medical Oncologist', experience: 14, rating: 4.9, avatar: 'https://i.pravatar.cc/150?img=11' },
        { id: 'd2', name: 'Dr. Emily Carter', specialty: 'Medical Advisor', experience: 12, rating: 4.9, avatar: 'https://i.pravatar.cc/150?img=47' }
      ],
      about: 'Memorial Sloan Kettering Cancer Center is a world-renowned leader in cancer care, research, and education. Our team of specialists provides comprehensive, personalized treatment plans for every patient.',
      address: '1275 York Avenue, New York, NY 10065, USA',
      phone: '+1 212 639 2000',
      email: 'info@mskcc.smartcare.com',
      website: 'mskcc.org',
      established: 1884,
      bedCount: 514,
      accreditation: 'JCI Accredited'
    },
    {
      id: 'h2',
      name: 'Mayo Clinic',
      location: 'Rochester, USA',
      country: 'USA',
      city: 'Rochester',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviewsCount: 2103,
      specialty: 'Multi-specialty',
      specialties: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics'],
      description: 'A nonprofit American academic medical center.',
      facilities: ['ICU', 'Surgery', 'Pharmacy', 'Lab', 'Wifi', 'Cafeteria'],
      doctors: [
        { id: 'd3', name: 'Dr. William Johnson', specialty: 'Cardiologist', experience: 18, rating: 4.9, avatar: 'https://i.pravatar.cc/150?img=12' }
      ],
      about: 'Mayo Clinic is a nonprofit American academic medical center focused on integrated health care, education, and research. It is home to the largest integrated group practice in the world.',
      address: '200 First Street SW, Rochester, MN 55905, USA',
      phone: '+1 507 284 2511',
      email: 'contact@mayo.smartcare.com',
      website: 'mayoclinic.org',
      established: 1864,
      bedCount: 1265,
      accreditation: 'JCI Accredited'
    },
    {
      id: 'h3',
      name: 'Cleveland Clinic',
      location: 'Cleveland, USA',
      country: 'USA',
      city: 'Cleveland',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      reviewsCount: 1876,
      specialty: 'Cardiology',
      specialties: ['Cardiology', 'Heart Surgery', 'Vascular'],
      description: 'A nonprofit multispecialty academic medical center.',
      facilities: ['ICU', 'Surgery', 'Heart Center', 'Lab', 'Wifi'],
      doctors: [
        { id: 'd4', name: 'Dr. Linda Wong', specialty: 'Cardiac Surgeon', experience: 20, rating: 4.8, avatar: 'https://i.pravatar.cc/150?img=44' }
      ],
      about: 'Cleveland Clinic is a nonprofit multispecialty academic medical center that integrates clinical and hospital care with research and education.',
      address: '9500 Euclid Avenue, Cleveland, OH 44195, USA',
      phone: '+1 216 444 2200',
      email: 'contact@clevelandclinic.smartcare.com',
      website: 'clevelandclinic.org',
      established: 1921,
      bedCount: 1400,
      accreditation: 'JCI Accredited'
    },
    {
      id: 'h4',
      name: 'Artemis Hospitals',
      location: 'Gurugram, India',
      country: 'India',
      city: 'Gurugram',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      reviewsCount: 987,
      specialty: 'Multi-specialty',
      specialties: ['Cardiology', 'Oncology', 'Orthopedics', 'Neurology'],
      description: 'Premier multi-specialty hospital in India.',
      facilities: ['24/7 Care', 'ICU', 'Surgery', 'Pharmacy', 'Wifi', 'Parking'],
      doctors: [
        { id: 'd5', name: 'Dr. Rohan Kapoor', specialty: 'Orthopedic Surgeon', experience: 15, rating: 4.7, avatar: 'https://i.pravatar.cc/150?img=33' }
      ],
      about: 'Artemis Hospitals is a premier multi-specialty hospital that combines world-class infrastructure, advanced medical technology, and the expertise of internationally trained doctors.',
      address: 'Sector 51, Gurugram, Haryana 122001, India',
      phone: '+91 124 451 1111',
      email: 'info@artemis.smartcare.com',
      website: 'artemishospitals.com',
      established: 2007,
      bedCount: 400,
      accreditation: 'JCI · NABH'
    },
    {
      id: 'h5',
      name: 'Acibadem Maslak Hospital',
      location: 'Istanbul, Turkey',
      country: 'Turkey',
      city: 'Istanbul',
      image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      reviewsCount: 1450,
      specialty: 'Multi-specialty',
      specialties: ['Cardiology', 'Oncology', 'Transplant', 'Pediatrics'],
      description: 'JCI-accredited hospital with advanced medical technology.',
      facilities: ['ICU', 'Transplant Unit', 'Surgery', 'Lab', 'Pharmacy', 'Hotel'],
      doctors: [
        { id: 'd6', name: 'Dr. Aslan Yilmaz', specialty: 'Transplant Surgeon', experience: 22, rating: 4.9, avatar: 'https://i.pravatar.cc/150?img=15' }
      ],
      about: 'Acibadem Maslak Hospital is one of the largest medical facilities in Turkey, providing comprehensive medical services across more than 35 specialties with internationally accredited standards.',
      address: 'Büyükdere Cad. 40, Maslak, 34457 Istanbul, Turkey',
      phone: '+90 212 304 4444',
      email: 'info@acibadem.smartcare.com',
      website: 'acibadem.com',
      established: 1991,
      bedCount: 200,
      accreditation: 'JCI Accredited'
    },
    {
      id: 'h6',
      name: 'Bumrungrad International',
      location: 'Bangkok, Thailand',
      country: 'Thailand',
      city: 'Bangkok',
      image: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviewsCount: 2240,
      specialty: 'Multi-specialty',
      specialties: ['Cardiology', 'Cosmetic Surgery', 'Wellness', 'Oncology'],
      description: 'World-class hospital serving over a million patients each year.',
      facilities: ['ICU', 'Wellness', 'Surgery', 'Lab', 'Pharmacy', 'Hotel'],
      doctors: [
        { id: 'd7', name: 'Dr. Niran Ruangwit', specialty: 'Cosmetic Surgeon', experience: 17, rating: 4.8, avatar: 'https://i.pravatar.cc/150?img=52' }
      ],
      about: 'Bumrungrad International is a multi-specialty medical facility serving more than a million patients a year from over 190 countries with world-class care.',
      address: '33 Sukhumvit 3, Wattana, Bangkok 10110, Thailand',
      phone: '+66 2 066 8888',
      email: 'info@bumrungrad.smartcare.com',
      website: 'bumrungrad.com',
      established: 1980,
      bedCount: 580,
      accreditation: 'JCI Accredited'
    }
  ]);

  readonly bookings = signal<Booking[]>([
    {
      id: 'b1',
      hospitalId: 'h1',
      hospitalName: 'Memorial Sloan Kettering',
      hospitalImage: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=400&q=80',
      doctorName: 'Dr. John Smith',
      doctorSpecialty: 'Medical Oncologist',
      date: '2026-05-15',
      time: '10:30 AM',
      status: 'Confirmed',
      bookingNumber: 'MT-240520-00123'
    },
    {
      id: 'b2',
      hospitalId: 'h2',
      hospitalName: 'Mayo Clinic',
      hospitalImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=400&q=80',
      doctorName: 'Dr. William Johnson',
      doctorSpecialty: 'Cardiologist',
      date: '2026-06-15',
      time: '02:00 PM',
      status: 'Pending',
      bookingNumber: 'MT-240615-00456'
    },
    {
      id: 'b3',
      hospitalId: 'h3',
      hospitalName: 'Cleveland Clinic',
      hospitalImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=400&q=80',
      doctorName: 'Dr. Linda Wong',
      doctorSpecialty: 'Cardiac Surgeon',
      date: '2026-02-10',
      time: '09:00 AM',
      status: 'Completed',
      bookingNumber: 'MT-240210-00789'
    }
  ]);

  readonly consultations = signal<ConsultationSession[]>([
    {
      id: 'c1',
      doctorName: 'Dr. Emily Carter',
      doctorSpecialty: 'Medical Advisor',
      doctorAvatar: 'https://i.pravatar.cc/150?img=47',
      date: '2026-05-15',
      time: '11:00 AM',
      status: 'Upcoming',
      notes: 'Initial consultation to review medical history and recommend treatment.'
    },
    {
      id: 'c2',
      doctorName: 'Dr. John Smith',
      doctorSpecialty: 'Medical Oncologist',
      doctorAvatar: 'https://i.pravatar.cc/150?img=11',
      date: '2026-04-02',
      time: '03:30 PM',
      status: 'Completed',
      notes: 'Reviewed treatment options and next steps.'
    }
  ]);

  readonly trip = signal<TripPlan>({
    id: 't1',
    destination: 'New York, USA',
    origin: 'Yangon, Myanmar',
    startDate: '2026-05-20',
    endDate: '2026-05-30',
    hotel: 'Hotel Pennsylvania, New York',
    flightNumber: 'AA-101',
    flightTime: '03:00 PM',
    vehicle: 'Sedan',
    itinerary: [
      { day: 1, date: '2026-05-20', title: 'Arrival in New York', description: 'Arrival at JFK and hotel check-in.', type: 'arrival' },
      { day: 2, date: '2026-05-21', title: 'Hospital Visit', description: 'Initial consultation with Dr. John Smith.', type: 'visit' },
      { day: 3, date: '2026-05-22', title: 'Treatment Schedule', description: 'Begin treatment plan as advised.', type: 'treatment' },
      { day: 9, date: '2026-05-28', title: 'Recovery & Follow-up', description: 'Follow-up visit and recovery monitoring.', type: 'recovery' },
      { day: 10, date: '2026-05-30', title: 'Departure', description: 'Airport drop-off — return home.', type: 'departure' }
    ]
  });

  readonly documents = signal<MedicalDocument[]>([
    { id: 'doc1', name: 'Medical_History_2025.pdf', type: 'pdf', size: '1.2 MB', uploadedAt: '2026-04-12', category: 'History' },
    { id: 'doc2', name: 'CT_Scan_Report.pdf', type: 'pdf', size: '3.4 MB', uploadedAt: '2026-04-15', category: 'Lab Reports' },
    { id: 'doc3', name: 'Prescription_April.pdf', type: 'pdf', size: '0.4 MB', uploadedAt: '2026-04-18', category: 'Prescriptions' },
    { id: 'doc4', name: 'Xray_Image.png', type: 'image', size: '2.1 MB', uploadedAt: '2026-04-20', category: 'Imaging' },
    { id: 'doc5', name: 'Insurance_Form.pdf', type: 'pdf', size: '0.7 MB', uploadedAt: '2026-04-22', category: 'Insurance' }
  ]);

  readonly reviews = signal<Review[]>([
    { id: 'r1', user: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=49', rating: 5, date: '2026-03-15', comment: 'Excellent care from arrival to discharge. The doctors were thorough and compassionate.' },
    { id: 'r2', user: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=14', rating: 5, date: '2026-02-22', comment: 'World-class facility. Highly recommend for cancer treatment — the staff went above and beyond.' },
    { id: 'r3', user: 'Aisha Patel', avatar: 'https://i.pravatar.cc/150?img=45', rating: 4, date: '2026-02-10', comment: 'Great service, modern facilities. Wait times were a bit long but the experience was worth it.' }
  ]);

  getHospital(id: string): Hospital | undefined {
    return this.hospitals().find(h => h.id === id);
  }

  addBooking(b: Booking): void {
    this.bookings.update(list => [b, ...list]);
  }

  addReview(r: Review): void {
    this.reviews.update(list => [r, ...list]);
  }
}
