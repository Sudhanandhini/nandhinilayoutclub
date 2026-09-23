import React from 'react';
import { Link } from 'react-router-dom';
import room1 from '/assets/images/rooms/room-1.jpg';
import room2 from '/assets/images/rooms/room-2.jpg';
import events1 from '/assets/images/new-year-banner.jpg';
import members from '/assets/images/home/members.jpg';

const galleryImages = [
  members,
  events1,
  room1,
  room2,
  events1,
  members,
  room1,
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="bg-primary">
        <div className="container-custom grid grid-cols-1 gap-10 py-14 lg:grid-cols-3">
          <div>
            <h3 className="mb-5 font-serif text-4xl text-white">About Club</h3>
            <p className="mb-6 text-sm leading-8 text-white/85">
              Nandini Layout Club - The perfect place to enjoy life in a classy and friendly atmosphere!
              The Club houses a unique combination of the traditions of an exclusive club and the best of
              today&apos;s sporting, leisure, entertaining and hotel facilities, in one of the most convenient
              locations in West Bangalore.
            </p>
            <Link
              to="/about"
              className="inline-block bg-[#f0a51a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#da9315]">
              Read More
            </Link>
          </div>

          <div>
            <h3 className="mb-5 font-serif text-4xl text-white">Amenities</h3>
            <div className="space-y-5 text-sm leading-8 text-white/85">
              <div>
                <p className="font-semibold text-white">1. Basement</p>
                <p>
                  The basement has a wooden shuttle court. Club has Table Tennis, Chess, &amp; Carom
                  Facilities in the same floor. Billiards Lounge is being planned in the same floor.
                </p>
              </div>
              <div>
                <p className="font-semibold text-white">2. Ground Floor</p>
                <p>
                  Ground Floor has a front office and a beautiful &amp; compact library with books,
                  DVDs, newspapers and periodicals for members.
                </p>
              </div>
            </div>
            <Link
              to="/amenities"
              className="mt-6 inline-block bg-[#f0a51a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#da9315]">
              Read More&gt;&gt;
            </Link>
          </div>

          <div>
            <h3 className="mb-5 font-serif text-4xl text-white">Photo Gallery</h3>
            <div className="grid grid-cols-4 gap-2">
              {galleryImages.map((src, index) => (
                <Link key={`${src}-${index}`} to="/gallery" className="block overflow-hidden border border-white/20 bg-white/10">
                  <img
                    src={src}
                    alt="Club gallery"
                    className="aspect-square h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-dark py-6">
        <div className="container-custom flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-3">
            {['F', 'T', 'G+', 'Y'].map(label => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xs font-bold text-primary transition hover:bg-gold hover:text-white">
                {label}
              </a>
            ))}
          </div>
          <p className="text-sm text-white/80">All rights reserved ©2015 | <a href="https://www.sunsys.in" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
            Powered By Sunsys Technologies
          </a></p>
        </div>
      </div>
    </footer>
  );
}
