import React from 'react';
import moment from 'moment';

function MemoryCard(props) {
  const memoryTypeRender = () => {
    if (props.memory.post_type === 'photo') {
      return <img src={props.memory.photo} alt='photo' />;
    } else if (props.memory.post_type === 'letter') {
      return <p>{props.memory.letter}</p>;
    } else if (props.memory.post_type === 'video') {
      return (
        <video width='420'>
          <source src={props.memory.video + '.mp4'} type='video/mp4' />
          <source src={props.memory.video} type='video/ogg' />
        </video>
      );
    }
  };

  const calcMemoryAge = () => {
    let memoryDate = moment(props.memory.memory_date);
    let birthday = moment(props.memory.timeline.birthday);

    let years = memoryDate.diff(birthday, 'year');
    birthday.add(years, 'years');

    let months = memoryDate.diff(birthday, 'months');
    birthday.add(months, 'months');

    if (years > 0 && years < 2) {
      return <h3>{years + ' year ' + months + ' months '}</h3>;
    } else if (years > 0 && years > 2) {
      return <h3>{years + ' years ' + months + ' months '}</h3>;
    } else {
      return <h3>{months + ' months '}</h3>;
    }
  };

  return (
    <div className='cd-timeline__block js-cd-block'>
      <div className='cd-timeline__img cd-timeline__img--picture js-cd-img'>
        <img src='img/cd-icon-picture.svg' alt='Picture' />
      </div>

      <div className='cd-timeline__content js-cd-content'>
        <div>{calcMemoryAge()}</div>
        <hr />
        <h2>{props.memory.title}</h2>
        <div>{memoryTypeRender()}</div>
        <hr />
        <div>
          <h4>
            Posted by {props.memory.user.name} on{' '}
            {moment(props.memory.created_at).format('MMMM Do YYYY')}
          </h4>
          <a href='#0' className='cd-timeline__read-more'>
            Read more
          </a>
        </div>
        <span className='cd-timeline__date'>
          {moment(props.memory.memory_date).format('MMM Do YYYY')}
        </span>
      </div>
    </div>
  );
}

export default MemoryCard;
