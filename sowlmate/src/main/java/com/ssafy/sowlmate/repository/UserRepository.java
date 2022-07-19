package com.ssafy.sowlmate.repository;

import com.ssafy.sowlmate.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    public User save(User user);

    public User findByNo(Long no);

    public User findById(String userId);

    public List<User> findAll();

    public int deleteById(String userId);
}


//@Repository
//public class UserRepository {
//
//    @PersistenceContext
//    EntityManager em;
//
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
//
//}
