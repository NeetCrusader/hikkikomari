'use client';

import type { PresenceCardProps, Activity } from '@/typings';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { motion } from 'framer-motion';
import { formatDuration, calculateProgress, calculateSpotifyProgress } from './activityHelpers';
import { useEffect, useState } from 'react';
import SvgImage from './SvgImage';

export default function PresenceCard({
  presence,
  date,
  direction,
  span,
  delay,
}: PresenceCardProps) {
  const [now, setNow] = useState(date);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swipeThreshold = 15;

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!presence || presence.activities.length === 0) return null;

  const translateAxis = direction === 'top' || direction === 'bottom' ? 'Y' : 'X';
  const translateSign = direction === 'top' || direction === 'left' ? '-' : '';

  const handleMouseDown = (e: React.MouseEvent) => setDragStartX(e.clientX);

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX === null) return;
    const diff = e.clientX - dragStartX;
    const activitiesLength = presence?.activities.length ?? 0;
    if (activitiesLength === 0) return;

    if (diff > swipeThreshold) {
      setCurrentIndex((prev) => (prev === 0 ? activitiesLength - 1 : prev - 1));
    } else if (diff < -swipeThreshold) {
      setCurrentIndex((prev) => (prev === activitiesLength - 1 ? 0 : prev + 1));
    }
    setDragStartX(null);
  };

  const renderActivity = (activity: Activity) => {
    const start = activity.timestamps?.start ? new Date(activity.timestamps.start) : null;
    const end = activity.timestamps?.end ? new Date(activity.timestamps.end) : null;
    const elapsed = start ? now.getTime() - start.getTime() : 0;
    const total = start && end ? end.getTime() - start.getTime() : 0;

    const progress =
      activity.name === 'Spotify'
        ? calculateSpotifyProgress(start ?? undefined, end ?? undefined)
        : total > 0
          ? calculateProgress(elapsed, total)
          : 0;

    return (
      <div className="flex flex-col md:flex-row items-center gap-2 w-full">
        {activity.assets.largeImage && (
          <div className="flex-shrink-0 w-16 h-16 md:w-16 md:h-16">
            <SvgImage
              src={activity.assets.largeImage}
              alt={activity.assets.largeText || activity.name}
              width={64}
              height={64}
              className="rounded-md object-cover w-full h-full"
            />
          </div>
        )}
        <div className="flex flex-col overflow-hidden w-full md:text-left text-center text-xs">
          <h1 className="font-semibold truncate">{activity.title}</h1>
          {activity.name === 'Spotify' ? (
            <>
              <p className="truncate">{activity.details}</p>
              <p className="truncate">by {activity.state}</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs">{formatDuration(elapsed)}</p>
                <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-1 rounded-full bg-white"
                    style={{ width: `${progress}%`, transition: 'width 0.3s ease' }}
                  />
                </div>
                <p className="text-xs">{formatDuration(total)}</p>
              </div>
            </>
          ) : (
            <>
              {activity.details && <p className="truncate">{activity.details}</p>}
              {activity.state && <p className="truncate">{activity.state}</p>}
              {start && <p className="text-xs truncate">{formatDuration(elapsed)} elapsed</p>}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className={`${span === 1 ? 'md:col-span-1 col-span-2' : 'col-span-2'} p-2 cursor-default select-none w-full`}
      initial={{ transform: `translate${translateAxis}(${translateSign}0.5rem)`, opacity: 0 }}
      whileInView={{ transform: `translate${translateAxis}(0)`, opacity: 1 }}
      transition={{ duration: 0.25, delay, ease: [0.39, 0.21, 0.12, 0.96] }}
      viewport={{ amount: 0.1, once: true }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      aria-label="Activities Carousel"
    >
      <Carousel
        selectedItem={currentIndex}
        onChange={(index) => setCurrentIndex(index)}
        className="w-full mt-1 bg-black/20 rounded-md p-2"
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        autoPlay
        interval={6000}
        stopOnHover
        infiniteLoop
        showThumbs={false}
        dynamicHeight={false}
      >
        {presence.activities.map((activity) => (
          <div
            key={activity.applicationId}
            className="flex justify-center items-center p-2 w-full min-h-[6rem]"
          >
            {renderActivity(activity)}
          </div>
        ))}
      </Carousel>
    </motion.div>
  );
}
