import React, {useState, useEffect} from 'react';
import CommentView from './Comment.view';
import database from '@react-native-firebase/database';
const functionsCounter = new Set();
export default function CommentContainer(props) {
  const {idsanpham, user} = props;
  const [listComments, setListComments] = useState([]);
  const [bough, setBough] = useState(0);
  const [rating, setRating] = useState(0);
  const [sao1, setSao1] = useState(0);
  const [sao2, setSao2] = useState(0);
  const [sao3, setSao3] = useState(0);
  const [sao4, setSao4] = useState(0);
  const [sao5, setSao5] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    let db = '';
    if (user === true) {
      db = '/ProductUser';
    } else {
      db = '/Products';
    }
    await database()
      .ref(db)
      .child(idsanpham)
      .once('value')
      .then((snapshot) => {
        var point = 0;
        var count = 0;
        var Sao1 = 0;
        var Sao2 = 0;
        var Sao3 = 0;
        var Sao4 = 0;
        var Sao5 = 0;
        var items = [];
        snapshot.child('Rating').forEach((child) => {
          if (child.val().Point == '1') {
            Sao1++;
          } else if (child.val().Point == '2') {
            Sao2++;
          } else if (child.val().Point == '3') {
            Sao3++;
          } else if (child.val().Point == '4') {
            Sao4++;
          } else if (child.val().Point == '5') {
            Sao5++;
          }
          point += child.val().Point;
          count++;
          items.push({
            Avatar: child.val().Avatar,
            Comment: child.val().Comment,
            Date: child.val().Date,
            Point: child.val().Point,
            UserName: child.val().UserName,
          });
        });

        setRating(point / count);
        setListComments(items);
        setBough(count);
        setSao1(Sao1);
        setSao2(Sao2);
        setSao3(Sao3);
        setSao4(Sao4);
        setSao5(Sao5);
        setIsLoading(false);
      });
  };
  const _onRefresh = () => {
    getData();
  };
  useEffect(() => {
    _onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  functionsCounter.add(_onRefresh);

  return (
    <CommentView
      listComments={listComments}
      bough={bough}
      rating={rating}
      sao1={sao1}
      sao2={sao2}
      sao3={sao3}
      sao4={sao4}
      sao5={sao5}
      isloading={isLoading}
    />
  );
}
