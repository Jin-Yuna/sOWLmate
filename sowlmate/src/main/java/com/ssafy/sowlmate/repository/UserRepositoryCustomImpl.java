package com.ssafy.sowlmate.repository;

import com.ssafy.sowlmate.entity.User;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.util.Optional;

public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    @PersistenceContext
    EntityManager em;

//    @Override
//    public Optional<User> login(User user) {
//        Optional<User> findedUser = null;
//
//        try {
//            findedUser = Optional.ofNullable(em.createQuery("select u.id, u.nickname from User u where u.id=:userId and u.password=:userPassword", User.class)
//                    .setParameter("userId", user.getId()).setParameter("userPassword", user.getPassword())
//                    .getSingleResult());
//        } catch (NoResultException e) {
//            findedUser = Optional.empty();
//        } finally {
//            return findedUser;
//        }
//    }


//    public Long save(User user) {
//        em.persist(user);
//        return user.getNo();
//    }
//
//    public User find(Long no) {
//        return em.find(User.class, no);
//    }
//
//    public Optional<User> findById(String userId) {
//        Optional<User> user = null;
//        try {
//            user = Optional.ofNullable(em.createQuery("select u from User u where u.id=:userId", User.class)
//                    .setParameter("userId", userId).getSingleResult());
//        } catch (NoResultException e) {
//            user = Optional.empty();
//        } finally {
//            return user;
//        }
//    }
//
//    public List<User> findAll() {
//        return em.createQuery("select u from User u", User.class).getResultList();
//    }
//
//    public int deleteById(String userId) {
//        return em.createQuery("delete from User u where u.id=:userId").setParameter("userId", userId).executeUpdate();
//    }
}
